- Sample json IDPs
```json

4: OK :{
  "jtype": "afb-reply",
  "request": {
    "status": "success"
  },
  "response": [
    {
      "uid": "github",
      "info": "Demo Client for afb-binder test",
      "logo": "\u0004",
      "client-id": "7899e605a7c15ae42f07",
      "token-url": "https://github.com/login/oauth/authorize",
      "login-url": "/sgate/github/login",
      "profils": [
        {
          "loa": 1,
          "uid": "basic",
          "scope": "user:email"
        },
        {
          "loa": 2,
          "uid": "teams",
          "scope": "read:org"
        }
      ]
    }
  ]
}

```

- profile user
```json
8: OK :{
  "jtype": "afb-reply",
  "request": {
    "status": "success"
  },
  "response": [
    {
      "id": 0,
      "pseudo": "fulup-bzh",
      "loa": 1,
      "stamp": 0,
      "email": "fulup@iot.bzh",
      "name": "Fulup Ar Foll",
      "avatar": "https://avatars.githubusercontent.com/u/7931186?v=4",
      "company": "IOT.BZH"
    },
    {
      "id": 0,
      "stamp": 0,
      "loa": 0,
      "idp": "github",
      "social": "7931186"
    },
    {
      "uid": "basic",
      "scope": "user:email",
      "loa": 1
    }
  ]
}

```

- La liste des verbs d'API dispo:

```
// Static verb not depending on shell json config file
static afb_verb_t idsvcVerbs[] = {
    /* VERB'S NAME         FUNCTION TO CALL         SHORT DESCRIPTION */
    { .verb = "ping",     .callback = idsvcPing    , .info = "ping test"},
    { .verb = "idp-list",  .callback = idpsList    , .info = "request idp list/scope for a given LOA level"},
    { .verb = "evt-subs", .callback = subscribeEvent, .info = "subscribe to sgate private client session events"},
    { .verb = "get-session",  .callback = sessionGet, .info = "retreive current client session [profil, user, social]"},
    { .verb = "usr-register", .callback = userRegister, .info = "register federated user profile into local fedid store"},
    { .verb = "chk-attribute", .callback = userCheckAttr, .info = "check user attribute within local store"},
    { .verb = "pam-login", .callback = xxx, .info = "send pseudo and password"}, [value, value] {login: value, passwd: value}

    { NULL} // terminator
};


```
http://localhost:4200/?action=login&language=en-EN
