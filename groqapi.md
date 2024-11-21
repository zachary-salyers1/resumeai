Class ChatGroq
Groq chat model integration.

The Groq API is compatible to the OpenAI API with some limitations. View the full API ref at:

Link
Setup: Install @langchain/groq and set an environment variable named GROQ_API_KEY.

npm install @langchain/groq
export GROQ_API_KEY="your-api-key"
Copy
Constructor args
Runtime args
Runtime args can be passed as the second argument to any of the base runnable methods .invoke. .stream, .batch, etc. They can also be passed via .bind, or the second arg in .bindTools, like shown in the examples below:

// When calling `.bind`, call options should be passed via the first argument
const llmWithArgsBound = llm.bind({
  stop: ["\n"],
  tools: [...],
});

// When calling `.bindTools`, call options should be passed via the second argument
const llmWithTools = llm.bindTools(
  [...],
  {
    tool_choice: "auto",
  }
);
Copy
Examples
Instantiate
import { ChatGroq } from '@langchain/groq';

const llm = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0,
  // other params...
});
Copy

Invoking

Streaming Chunks

Aggregate Streamed Chunks

Bind tools

Structured Output

Hierarchy
BaseChatModel<ChatGroqCallOptions, AIMessageChunk>
ChatGroq
Defined in libs/langchain-groq/src/chat_models.ts:641
Constructors
constructor
Methods
asTool
assign
batch
bind
bindTools
getGraph
getNumTokens
invoke
pick
pipe
stream
streamEvents
streamLog
transform
withConfig
withFallbacks
withListeners
withRetry
withStructuredOutput
constructor
new ChatGroq(fields?): ChatGroq
Parameters
Optionalfields: ChatGroqInput
Returns ChatGroq
Overrides BaseChatModel< ChatGroqCallOptions, AIMessageChunk >.constructor

Defined in libs/langchain-groq/src/chat_models.ts:681
asTool
asTool<T>(fields): RunnableToolLike<ZodType<ToolCall | T, ZodTypeDef, ToolCall | T>, AIMessageChunk>
Convert a runnable to a tool. Return a new instance of RunnableToolLike which contains the runnable, name, description and schema.

Type Parameters
T extends BaseLanguageModelInput = BaseLanguageModelInput
Parameters
fields: {
    description?: string;
    name?: string;
    schema: ZodType<T, ZodTypeDef, T>;
}
Optionaldescription?: string
The description of the tool. Falls back to the description on the Zod schema if not provided, or undefined if neither are provided.

Optionalname?: string
The name of the tool. If not provided, it will default to the name of the runnable.

schema: ZodType<T, ZodTypeDef, T>
The Zod schema for the input of the tool. Infers the Zod type from the input type of the runnable.

Returns RunnableToolLike<ZodType<ToolCall | T, ZodTypeDef, ToolCall | T>, AIMessageChunk>
An instance of RunnableToolLike which is a runnable that can be used as a tool.

Inherited from BaseChatModel.asTool

Defined in langchain-core/dist/runnables/base.d.ts:306
assign
assign(mapping): Runnable<any, any, RunnableConfig<Record<string, any>>>
Assigns new fields to the dict output of this runnable. Returns a new runnable.

Parameters
mapping: RunnableMapLike<Record<string, unknown>, Record<string, unknown>>
Returns Runnable<any, any, RunnableConfig<Record<string, any>>>
Inherited from BaseChatModel.assign

Defined in langchain-core/dist/runnables/base.d.ts:138
batch
batch(inputs, options?, batchOptions?): Promise<AIMessageChunk[]>
Default implementation of batch, which calls invoke N times. Subclasses should override this method if they can batch more efficiently.

Parameters
inputs: BaseLanguageModelInput[]
Array of inputs to each batch call.

Optionaloptions: Partial<ChatGroqCallOptions> | Partial<ChatGroqCallOptions>[]
Either a single call options object to apply to each batch call or an array for each call.

OptionalbatchOptions: RunnableBatchOptions & {
    returnExceptions?: false;
}
Returns Promise<AIMessageChunk[]>
An array of RunOutputs, or mixed RunOutputs and errors if batchOptions.returnExceptions is set

Inherited from BaseChatModel.batch

Defined in langchain-core/dist/runnables/base.d.ts:76
batch(inputs, options?, batchOptions?): Promise<(Error | AIMessageChunk)[]>
Parameters
inputs: BaseLanguageModelInput[]
Optionaloptions: Partial<ChatGroqCallOptions> | Partial<ChatGroqCallOptions>[]
OptionalbatchOptions: RunnableBatchOptions & {
    returnExceptions: true;
}
Returns Promise<(Error | AIMessageChunk)[]>
Inherited from BaseChatModel.batch

Defined in langchain-core/dist/runnables/base.d.ts:79
batch(inputs, options?, batchOptions?): Promise<(Error | AIMessageChunk)[]>
Parameters
inputs: BaseLanguageModelInput[]
Optionaloptions: Partial<ChatGroqCallOptions> | Partial<ChatGroqCallOptions>[]
OptionalbatchOptions: RunnableBatchOptions
Returns Promise<(Error | AIMessageChunk)[]>
Inherited from BaseChatModel.batch

Defined in langchain-core/dist/runnables/base.d.ts:82
bind
bind(kwargs): Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Bind arguments to a Runnable, returning a new Runnable.

Parameters
kwargs: Partial<ChatGroqCallOptions>
Returns Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
A new RunnableBinding that, when invoked, will apply the bound args.

Inherited from BaseChatModel.bind

Defined in langchain-core/dist/runnables/base.d.ts:35
bindTools
bindTools(tools, kwargs?): Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Bind tool-like objects to this chat model.

Parameters
tools: ChatGroqToolType[]
A list of tool definitions to bind to this chat model. Can be a structured tool, an OpenAI formatted tool, or an object matching the provider's specific tool schema.

Optionalkwargs: Partial<ChatGroqCallOptions>
Any additional parameters to bind.

Returns Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Overrides BaseChatModel.bindTools

Defined in libs/langchain-groq/src/chat_models.ts:763
getGraph
getGraph(_?): Graph
Parameters
Optional_: RunnableConfig<Record<string, any>>
Returns Graph
Inherited from BaseChatModel.getGraph

Defined in langchain-core/dist/runnables/base.d.ts:123
getNumTokens
getNumTokens(content): Promise<number>
Parameters
content: MessageContent
Returns Promise<number>
Inherited from BaseChatModel.getNumTokens

Defined in langchain-core/dist/language_models/base.d.ts:170
invoke
invoke(input, options?): Promise<AIMessageChunk>
Invokes the chat model with a single input.

Parameters
input: BaseLanguageModelInput
The input for the language model.

Optionaloptions: ChatGroqCallOptions
The call options.

Returns Promise<AIMessageChunk>
A Promise that resolves to a BaseMessageChunk.

Inherited from BaseChatModel.invoke

Defined in langchain-core/dist/language_models/chat_models.d.ts:90
pick
pick(keys): Runnable<any, any, RunnableConfig<Record<string, any>>>
Pick keys from the dict output of this runnable. Returns a new runnable.

Parameters
keys: string | string[]
Returns Runnable<any, any, RunnableConfig<Record<string, any>>>
Inherited from BaseChatModel.pick

Defined in langchain-core/dist/runnables/base.d.ts:134
pipe
pipe<NewRunOutput>(coerceable): Runnable<BaseLanguageModelInput, Exclude<NewRunOutput, Error>, RunnableConfig<Record<string, any>>>
Create a new runnable sequence that runs each individual runnable in series, piping the output of one runnable into another runnable or runnable-like.

Type Parameters
NewRunOutput
Parameters
coerceable: RunnableLike<AIMessageChunk, NewRunOutput, RunnableConfig<Record<string, any>>>
A runnable, function, or object whose values are functions or runnables.

Returns Runnable<BaseLanguageModelInput, Exclude<NewRunOutput, Error>, RunnableConfig<Record<string, any>>>
A new runnable sequence.

Inherited from BaseChatModel.pipe

Defined in langchain-core/dist/runnables/base.d.ts:130
stream
stream(input, options?): Promise<IterableReadableStream<AIMessageChunk>>
Stream output in chunks.

Parameters
input: BaseLanguageModelInput
Optionaloptions: Partial<ChatGroqCallOptions>
Returns Promise<IterableReadableStream<AIMessageChunk>>
A readable stream that is also an iterable.

Inherited from BaseChatModel.stream

Defined in langchain-core/dist/runnables/base.d.ts:96
streamEvents
streamEvents(input, options, streamOptions?): IterableReadableStream<StreamEvent>
Generate a stream of events emitted by the internal steps of the runnable.

Use to create an iterator over StreamEvents that provide real-time information about the progress of the runnable, including StreamEvents from intermediate results.

A StreamEvent is a dictionary with the following schema:

event: string - Event names are of the format: on_[runnable_type]_(start|stream|end).
name: string - The name of the runnable that generated the event.
run_id: string - Randomly generated ID associated with the given execution of the runnable that emitted the event. A child runnable that gets invoked as part of the execution of a parent runnable is assigned its own unique ID.
tags: string[] - The tags of the runnable that generated the event.
metadata: Record<string, any> - The metadata of the runnable that generated the event.
data: Record<string, any>
Below is a table that illustrates some events that might be emitted by various chains. Metadata fields have been omitted from the table for brevity. Chain definitions have been included after the table.

ATTENTION This reference table is for the V2 version of the schema.

+----------------------+-----------------------------+------------------------------------------+
| event                | input                       | output/chunk                             |
+======================+=============================+==========================================+
| on_chat_model_start  | {"messages": BaseMessage[]} |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chat_model_stream |                             | AIMessageChunk("hello")                  |
+----------------------+-----------------------------+------------------------------------------+
| on_chat_model_end    | {"messages": BaseMessage[]} | AIMessageChunk("hello world")            |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_start         | {'input': 'hello'}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_stream        |                             | 'Hello'                                  |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_end           | 'Hello human!'              |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_start       |                             |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_stream      |                             | "hello world!"                           |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_end         | [Document(...)]             | "hello world!, goodbye world!"           |
+----------------------+-----------------------------+------------------------------------------+
| on_tool_start        | {"x": 1, "y": "2"}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_tool_end          |                             | {"x": 1, "y": "2"}                       |
+----------------------+-----------------------------+------------------------------------------+
| on_retriever_start   | {"query": "hello"}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_retriever_end     | {"query": "hello"}          | [Document(...), ..]                      |
+----------------------+-----------------------------+------------------------------------------+
| on_prompt_start      | {"question": "hello"}       |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_prompt_end        | {"question": "hello"}       | ChatPromptValue(messages: BaseMessage[]) |
+----------------------+-----------------------------+------------------------------------------+
Copy
The "on_chain_*" events are the default for Runnables that don't fit one of the above categories.

In addition to the standard events above, users can also dispatch custom events.

Custom events will be only be surfaced with in the v2 version of the API!

A custom event has following format:

+-----------+------+------------------------------------------------------------+
| Attribute | Type | Description                                                |
+===========+======+============================================================+
| name      | str  | A user defined name for the event.                         |
+-----------+------+------------------------------------------------------------+
| data      | Any  | The data associated with the event. This can be anything.  |
+-----------+------+------------------------------------------------------------+
Copy
Here's an example:

import { RunnableLambda } from "@langchain/core/runnables";
import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch";
// Use this import for web environments that don't support "async_hooks"
// and manually pass config to child runs.
// import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch/web";

const slowThing = RunnableLambda.from(async (someInput: string) => {
  // Placeholder for some slow operation
  await new Promise((resolve) => setTimeout(resolve, 100));
  await dispatchCustomEvent("progress_event", {
   message: "Finished step 1 of 2",
 });
 await new Promise((resolve) => setTimeout(resolve, 100));
 return "Done";
});

const eventStream = await slowThing.streamEvents("hello world", {
  version: "v2",
});

for await (const event of eventStream) {
 if (event.event === "on_custom_event") {
   console.log(event);
 }
}
Copy
Parameters
input: BaseLanguageModelInput
options: Partial<ChatGroqCallOptions> & {
    version: "v1" | "v2";
}
OptionalstreamOptions: Omit<EventStreamCallbackHandlerInput, "autoClose">
Returns IterableReadableStream<StreamEvent>
Inherited from BaseChatModel.streamEvents

Defined in langchain-core/dist/runnables/base.d.ts:268
streamEvents(input, options, streamOptions?): IterableReadableStream<Uint8Array>
Parameters
input: BaseLanguageModelInput
options: Partial<ChatGroqCallOptions> & {
    encoding: "text/event-stream";
    version: "v1" | "v2";
}
OptionalstreamOptions: Omit<EventStreamCallbackHandlerInput, "autoClose">
Returns IterableReadableStream<Uint8Array>
Inherited from BaseChatModel.streamEvents

Defined in langchain-core/dist/runnables/base.d.ts:271
streamLog
streamLog(input, options?, streamOptions?): AsyncGenerator<RunLogPatch, any, unknown>
Stream all output from a runnable, as reported to the callback system. This includes all inner runs of LLMs, Retrievers, Tools, etc. Output is streamed as Log objects, which include a list of jsonpatch ops that describe how the state of the run has changed in each step, and the final state of the run. The jsonpatch ops can be applied in order to construct state.

Parameters
input: BaseLanguageModelInput
Optionaloptions: Partial<ChatGroqCallOptions>
OptionalstreamOptions: Omit<LogStreamCallbackHandlerInput, "autoClose">
Returns AsyncGenerator<RunLogPatch, any, unknown>
Inherited from BaseChatModel.streamLog

Defined in langchain-core/dist/runnables/base.d.ts:158
transform
transform(generator, options): AsyncGenerator<AIMessageChunk, any, unknown>
Default implementation of transform, which buffers input and then calls stream. Subclasses should override this method if they can start producing output while input is still being generated.

Parameters
generator: AsyncGenerator<BaseLanguageModelInput, any, unknown>
options: Partial<ChatGroqCallOptions>
Returns AsyncGenerator<AIMessageChunk, any, unknown>
Inherited from BaseChatModel.transform

Defined in langchain-core/dist/runnables/base.d.ts:146
withConfig
withConfig(config): Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Bind config to a Runnable, returning a new Runnable.

Parameters
config: RunnableConfig<Record<string, any>>
New configuration parameters to attach to the new runnable.

Returns Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
A new RunnableBinding with a config matching what's passed.

Inherited from BaseChatModel.withConfig

Defined in langchain-core/dist/runnables/base.d.ts:55
withFallbacks
withFallbacks(fields): RunnableWithFallbacks<BaseLanguageModelInput, AIMessageChunk>
Create a new runnable from the current one that will try invoking other passed fallback runnables if the initial invocation fails.

Parameters
fields: {
    fallbacks: Runnable<BaseLanguageModelInput, AIMessageChunk, RunnableConfig<Record<string, any>>>[];
} | Runnable<BaseLanguageModelInput, AIMessageChunk, RunnableConfig<Record<string, any>>>[]
Returns RunnableWithFallbacks<BaseLanguageModelInput, AIMessageChunk>
A new RunnableWithFallbacks.

Inherited from BaseChatModel.withFallbacks

Defined in langchain-core/dist/runnables/base.d.ts:62
withListeners
withListeners(params): Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Bind lifecycle listeners to a Runnable, returning a new Runnable. The Run object contains information about the run, including its id, type, input, output, error, startTime, endTime, and any tags or metadata added to the run.

Parameters
params: {
    onEnd?: ((run: Run, config?: RunnableConfig<Record<string, any>>) => void | Promise<void>);
    onError?: ((run: Run, config?: RunnableConfig<Record<string, any>>) => void | Promise<void>);
    onStart?: ((run: Run, config?: RunnableConfig<Record<string, any>>) => void | Promise<void>);
}
The object containing the callback functions.

OptionalonEnd?: ((run: Run, config?: RunnableConfig<Record<string, any>>) => void | Promise<void>)
Called after the runnable finishes running, with the Run object.

(run, config?): void | Promise<void>
Parameters
run: Run
Optionalconfig: RunnableConfig<Record<string, any>>
Returns void | Promise<void>
OptionalonError?: ((run: Run, config?: RunnableConfig<Record<string, any>>) => void | Promise<void>)
Called if the runnable throws an error, with the Run object.

(run, config?): void | Promise<void>
Parameters
run: Run
Optionalconfig: RunnableConfig<Record<string, any>>
Returns void | Promise<void>
OptionalonStart?: ((run: Run, config?: RunnableConfig<Record<string, any>>) => void | Promise<void>)
Called before the runnable starts running, with the Run object.

(run, config?): void | Promise<void>
Parameters
run: Run
Optionalconfig: RunnableConfig<Record<string, any>>
Returns void | Promise<void>
Returns Runnable<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Inherited from BaseChatModel.withListeners

Defined in langchain-core/dist/runnables/base.d.ts:289
withRetry
withRetry(fields?): RunnableRetry<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
Add retry logic to an existing runnable.

Parameters
Optionalfields: {
    onFailedAttempt?: RunnableRetryFailedAttemptHandler;
    stopAfterAttempt?: number;
}
OptionalonFailedAttempt?: RunnableRetryFailedAttemptHandler
OptionalstopAfterAttempt?: number
Returns RunnableRetry<BaseLanguageModelInput, AIMessageChunk, ChatGroqCallOptions>
A new RunnableRetry that, when invoked, will retry according to the parameters.

Inherited from BaseChatModel.withRetry

Defined in langchain-core/dist/runnables/base.d.ts:46
withStructuredOutput
withStructuredOutput<RunOutput>(outputSchema, config?): Runnable<BaseLanguageModelInput, RunOutput, RunnableConfig<Record<string, any>>>
Type Parameters
RunOutput extends Record<string, any> = Record<string, any>
Parameters
outputSchema: Record<string, any> | ZodType<RunOutput, ZodTypeDef, RunOutput>
Optionalconfig: StructuredOutputMethodOptions<false>
Returns Runnable<BaseLanguageModelInput, RunOutput, RunnableConfig<Record<string, any>>>
Overrides BaseChatModel.withStructuredOutput

Defined in libs/langchain-groq/src/chat_models.ts:971
withStructuredOutput<RunOutput>(outputSchema, config?): Runnable<BaseLanguageModelInput, {
    parsed: RunOutput;
    raw: BaseMessage;
}, RunnableConfig<Record<string, any>>>
Type Parameters
RunOutput extends Record<string, any> = Record<string, any>
Parameters
outputSchema: Record<string, any> | ZodType<RunOutput, ZodTypeDef, RunOutput>
Optionalconfig: StructuredOutputMethodOptions<true>
Returns Runnable<BaseLanguageModelInput, {
    parsed: RunOutput;
    raw: BaseMessage;
}, RunnableConfig<Record<string, any>>>
Overrides BaseChatModel.withStructuredOutput

Defined in libs/langchain-groq/src/chat_models.ts:982