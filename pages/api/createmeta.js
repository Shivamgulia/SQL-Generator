import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
} from 'langchain/prompts';

import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';

export default async function handler(req, res) {
  console.log(req.body);

  const template =
    'for the given data about the table, generate the meta data of the table in the proper json format. consider the following point while generate the meta data: 1.Find the schema of the table to generate metadata 2. Metadata must be in JSON format 3.Generate the information of the table in concise manner. 4.Generate the data while mentioning the appropriate information about the table such as its primary key, foreign ,its description etc. 5. Make sure to describe all the columns of the table. 6.Also add the description of the table at the end of meta data of each table 7.Use table name while refering to a table 8.Also dont create different tables as object of table. Also make sure to return it in the proper format.';
  const systemMessagePrompt =
    SystemMessagePromptTemplate.fromTemplate(template);
  const humanTemplate =
    'for the given information {input} about the table,  generate the meta data in the json format appropriately.';
  const PROMPT = new PromptTemplate({
    template: humanTemplate,
    inputVariables: ['input'],
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

  console.log(chatPrompt);

  const metaDataChain = new LLMChain({
    llm: new ChatOpenAI({
      openAIApiKey: 'Your_api_key',
    }),
    prompt: chatPrompt,
    verbose: true,
  });

  //   const ans = await metaDataChain.call({
  //     input:
  //       'CREATE TABLE person (id INT PRIMARY KEY, fname VARCHAR(50), lname VARCHAR(50));',
  //   });
  const ans = await metaDataChain.call({
    input: req.body.text,
  });

  res.status(200).json({ Response: ans });
}
