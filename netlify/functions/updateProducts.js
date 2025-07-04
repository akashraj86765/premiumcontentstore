const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  const { products } = JSON.parse(event.body);
  await supabase.from('products').delete().neq('id', '');
  const { error } = await supabase.from('products').insert(products);
  return {
    statusCode: error ? 500 : 200,
    body: JSON.stringify({ error: error?.message })
  };
};