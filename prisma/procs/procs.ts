

type procTypes  = {
  getUserRoles: string 
}

export  const procs:procTypes = {
  
  getUserRoles:  `CREATE OR REPLACE FUNCTION get_user_roles(
            p_email TEXT,
            p_username TEXT,
            p_role_id INT
        )
        RETURNS TABLE(username TEXT, email TEXT, role_id INT , first_name text ,last_name text , password text  ) AS
        $$
        BEGIN
          RETURN QUERY
          SELECT x.*
          FROM (
            SELECT u.username username, 
        u.email email,
        uhr.role_id AS role_id,
          COALESCE(u.first_name::text, '') as first_name  , COALESCE (u.last_name::text, '') as last_name , u.password password 
            FROM users u
            INNER JOIN user_has_roles uhr ON uhr.user_id = u.id
            WHERE (u.email = p_email OR u.username = p_username)
          ) x
          WHERE x.role_id = p_role_id;
        END;
        $$ LANGUAGE plpgsql; `
}


