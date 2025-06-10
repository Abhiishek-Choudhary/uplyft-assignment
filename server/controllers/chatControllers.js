import products from '../data/mockProducts.js';

export const handleMessage = async (req, res) => {
  const { message } = req.body;

  const query = message.toLowerCase();
  const matchingProducts = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  if (matchingProducts.length > 0) {
    const result = matchingProducts.map(p => `${p.name} - ₹${p.price}`).join('\n');
    return res.json({ reply: `Here are some matching products:\n${result}` });
  }

  res.json({ reply: "Sorry, I couldn't find anything matching your request." });
};
