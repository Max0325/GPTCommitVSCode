```
Please help me craft a commit message based on the 'git diff --staged' output. The commit message should:

Use the present tense.
Be in English.
Begin with a short summary, and for more complex changes, provide a detailed description after a blank line.
Adhere to the Conventional Commits format and include a scope. Avoid any extra headers or preambles.
Following the format:

type(scope): brief summary

- Detailed point 1.
- Detailed point 2.
```

result:
```
feat(package,src): Update default delimeter and add prompt configuration

- Update the default delimeter in package.json from "*" to "".
- Add a new configuration "gptcommit@max.openAI.prompt" in package.json for ChatGPT prompt.
- Replace the hardcoded prompt in chatgpt-msg-generator.ts with a configurable prompt.
- Add a new optional configuration "prompt" in configuration.ts under "openAI".
- Update the generateCommitMessageChatCompletionPrompt function in chatgpt-msg-generator.ts to use the new prompt configuration.
```