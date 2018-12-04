          var user_res = results[0];

          console.log(user_res);

          //if (user_res === NULL)

          var user_global = {
            email: user_res.email,
            username: user_res.email,
            first: user_res.first_name, 
            last: user_res.last_name,
            id: user_res.id,
            phone: user_res.phone,
            profession: user_res.profession
          };

          req.session.user = user_global;
          server_user_session = user_global;

          res.send(server_user_session);