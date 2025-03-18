#DevTinder APIs

authRouter
- post /signup
- post /signin
- post /login

profileRouter
- get /profile/view
- patch /profile/edit
- patch /profile/password

connectionRequestRouter
- post /request/send/interested/:userId
- post /request/send/ignored/:userId
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestId

userRouter
- get user/connections
- get user/requests/recieved
- get user/feed - Gets you the profiles of the other users on platform


Status: ignore, intrested, accepted, rejected