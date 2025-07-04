const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  const { action, password, newPassword } = JSON.parse(event.body);
  
  if (action === 'login') {
    const { data } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'admin_password')
      .single();
    return {
      statusCode: data?.value === password ? 200 : 401,
      body: JSON.stringify({ success: data?.value === password })
    };
  } 
  else if (action === 'changePassword') {
    await supabase.from('admin_settings').upsert([{ key: 'admin_password', value: newPassword }]);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }
};