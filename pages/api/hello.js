// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // Search for the most similar document
  const response = await vectorStore.similaritySearch('hello', 1);

  console.log(response);
  res.status(200).json({ response: response });
}
