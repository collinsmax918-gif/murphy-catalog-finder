-- Grant admin role to maxycollins22@outlook.com
-- This will work as soon as the account is created
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM profiles
WHERE email = 'maxycollins22@outlook.com'
ON CONFLICT (user_id, role) DO NOTHING;