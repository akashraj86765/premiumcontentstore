const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { products } = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('products')
      .update({ items: products })
      .eq('id', 'all-products');

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error updating products:', error);
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }
};