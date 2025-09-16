import cors from 'cors';
import express from 'express';
import connectDB from './db/dbConnect';
import authRouter from './routes/auth.route';
import onboardingRouter from './routes/onboarding.route';

require('dotenv').config()

const PORT = process.env.PORT||3000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/recruiter',authRouter)
app.use('/api', onboardingRouter);

connectDB()

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`)
})





