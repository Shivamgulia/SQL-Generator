import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { TextLoader } from 'langchain/document_loaders/fs/text';

export default async function handler(req, res) {
  console.log(req);
  const vectorStore = await Chroma.fromTexts(
    [req.body.text],
    [{ name: req.body.name }],
    new OpenAIEmbeddings({
      openAIApiKey: 'Your_api_key',
    }),
    {
      collectionName: 'test',
    }
  );

  console.log('done');
  res.status(200).json({ message: 'success' });
}
