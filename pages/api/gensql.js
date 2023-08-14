import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
} from 'langchain/prompts';

import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';

export default async function handler(req, res) {
  console.log(req);
  const vectorStore = await Chroma.fromExistingCollection(
    new OpenAIEmbeddings({
      openAIApiKey: 'Your_api_key',
    }),
    { collectionName: 'test' }
  );
  const response = await vectorStore.similaritySearch(req.body.input, 3);

  console.log(response);

  let content = '';

  for (let i = 0; i < response.length; i++) {
    content = content + '' + response[i].pageContent;
  }

  console.log(content);

  const template =
    'For the given input, generate the synatically correct SQL query and its description based on the information stored in the file. Consider the following point while generating the meta data: 1.Generate the sql query in the proper format. 2.Analyse the data properly stored and then return the SQL query 3.Make sure to cross-check the query before generating it. 4.When writing the SQL query, be sure to follow proper syntax Generate the output in the following format: SQL Query: Description of SQL Query';
  const systemMessagePrompt =
    SystemMessagePromptTemplate.fromTemplate(template);
  const humanTemplate =
    'Given the meta data {context} of the database, generate the synatically correct SQL query and Its description for the {input}';
  const PROMPT = new PromptTemplate({
    template: humanTemplate,
    inputVariables: ['context', 'input'],
  });
  const humanMessagePrompt = new HumanMessagePromptTemplate({ prompt: PROMPT });

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    systemMessagePrompt,
    humanMessagePrompt,
  ]);

  //   // Format the messages
  // const formattedChatPrompt = await chatPrompt.formatMessages({
  //   input:
  //     'CREATE TABLE person (id INT PRIMARY KEY, fname VARCHAR(50), lname VARCHAR(50));',
  // });

  //   console.log(chatPrompt);

  const metaDataChain = new LLMChain({
    llm: new ChatOpenAI({
      openAIApiKey: 'Your_api_key',
    }),
    prompt: chatPrompt,
    verbose: true,
  });

  const ans = await metaDataChain.call({
    context: content,
    input: req.body.input,
  });
  console.log(ans);

  res.status(200).json({ Response: ans });
}
