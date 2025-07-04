const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { data, error } = await supabase
      .from('products')
      .select('items')
      .eq('id', 'all-products')
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data.items)
    };
  } catch (error) {
    console.error('Error getting products:', error);
    return {
      statusCode: 400,
      body: JSON.stringify([])
    };
  }
};