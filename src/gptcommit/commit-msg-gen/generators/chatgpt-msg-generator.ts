/*
 * This code includes portions of code from the opencommit project, which is
 * licensed under the MIT License. Copyright (c) Dima Sukharev.
 * The original code can be found at https://github.com/di-sukharev/opencommit/blob/master/src/generateCommitMessageFromGitDiff.ts.
 */

import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

import { trimNewLines } from "@utils/text";
import { Configuration as AppConfiguration } from "@utils/configuration";

import { MsgGenerator } from "./msg-generator";

const defaultPrompt = `
  Please help me craft a commit message based on the 'git diff --staged' output. The commit message should:

  Use the present tense.
  Be in English.
  Begin with a short summary, and for more complex changes, provide a detailed description after a blank line.
  Adhere to the Conventional Commits format and include a scope. Avoid any extra headers or preambles.
`;

function generateCommitMessageChatCompletionPrompt(
  diff: string,
  config?: AppConfiguration["openAI"]
): Array<ChatCompletionRequestMessage> {
  const chatContextAsCompletionRequest: Array<ChatCompletionRequestMessage> = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: config?.prompt?.trim() || defaultPrompt,
    },
  ];

  chatContextAsCompletionRequest.push({
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: diff,
  });

  return chatContextAsCompletionRequest;
}

const defaultModel = "gpt-3.5-turbo-16k";
const defaultTemperature = 0.2;
const defaultMaxTokens = 196;

export class ChatgptMsgGenerator implements MsgGenerator {
  openAI: OpenAIApi;
  config?: AppConfiguration["openAI"];

  constructor(config: AppConfiguration["openAI"]) {
    this.openAI = new OpenAIApi(
      new Configuration({
        apiKey: config.apiKey,
      }),
      config.customEndpoint?.trim() || undefined
    );
    this.config = config;
  }

  async generate(diff: string, delimeter?: string) {
    const messages = generateCommitMessageChatCompletionPrompt(
      diff,
      this.config
    );
    const { data } = await this.openAI.createChatCompletion({
      model: this.config?.gptVersion || defaultModel,
      messages: messages,
      temperature: this.config?.temperature || defaultTemperature,
      ["max_tokens"]: this.config?.maxTokens || defaultMaxTokens,
    });

    const message = data?.choices[0].message;
    const commitMessage = message?.content;

    if (!commitMessage) {
      throw new Error("No commit message were generated. Try again.");
    }

    return trimNewLines(commitMessage, delimeter);
  }
}
