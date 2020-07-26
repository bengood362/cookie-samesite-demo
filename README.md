# Demo SameSite

## Prerequisite
Please add these into /etc/hosts for testing purpose  
127.0.0.1   cookie.localhost.com  
127.0.0.1   test.localhost.com  
127.0.0.1   test.localhost2.com  

## Testing steps
1. start tab 1 in cookie.localhost.com:8080 and choose one cookie SameSite mode (Strict, LAX, None)
2. start tab 2 in cookie.localhost.com:8081 to pretend it is the same site
3. start tab 3 in test.localhost2.com:8081 to pretend it is a third party site
4. Check if cookie is sent the requests (Form, Anchor, Link, IFrame, Ajax, Image)
