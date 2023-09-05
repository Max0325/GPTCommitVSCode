```
Generate a concise commit message from the following git diff.
The message should contain a first line with a short summary and if the commit is non-trivial a longer description after a blank line.

Following the format:

type(scope): brief summary

- Detailed point 1.
- Detailed point 2.
```

result:
```
feat(gptcommit): add custom prompt configuration for ChatGPT

- Added a new configuration option `gptcommit@max.openAI.prompt` in `package.json` to allow custom prompts for ChatGPT.
- Refactored `chatgpt-msg-generator.ts` to use the new configuration option or a default prompt if not provided.
- Updated the configuration schema in `configuration.ts` to include the new `prompt` field.
```