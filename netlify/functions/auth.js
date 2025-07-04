const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { action, password, newPassword } = JSON.parse(event.body);

  try {
    if (action === 'login') {
      const { data, error } = await supabase
        .from('admin')
        .select('password')
        .limit(1)
        .single();

      if (error) throw error;
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: password === data.password 
        })
      };
    }
    else if (action === 'changePassword') {
      const { error } = await supabase
        .from('admin')
        .update({ password: newPassword })
        .limit(1);

      if (error) throw error;
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }
    
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid action' })
    };
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    };
  }
};