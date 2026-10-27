import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import { loginRoute } from "@/routes/loginRoute.js"
import { superUserRouter } from "@/routes/superUsersRoute.js";
import { companyRouter } from '@/routes/companiesRoute.js';
import { userRouter } from '@/routes/userRoute.js';
import { permissionRouter } from '@/routes/permissionsRoute.js';
import { changedLicenceRouter } from '@/routes/changedLicencesRoute.js';
import { urlsRouter } from "@/routes/urlsRoute.js";
import { licencesTypeRouter } from '@/routes/licencesTypeRoute.js'; 
import { licenceFreeRouter } from '@/routes/licencesFreeRoute.js';
import { licencesSubscribeRouter } from '@/routes/licensesSubscribedRoute.js'; 
import { priceRouter } from "@/routes/priceRoute.js";
import { averagePriceRouter } from "@/routes/averagePriceRoute.js";
import { motherBoardRouter } from '@/routes/motherBoardsRoute.js';
import { authMiddleware } from '@/middlewares/authMiddleware.js'
import { roleRoute } from '@/routes/roleRoute.js'

const app = express();


// for motherboard client
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));
//  set it for motherboard client

// for tests headers
// app.use((req, res, next) => {
//   console.log(`\n[${req.method}] ${req.originalUrl}`)
//   console.log(req.headers)
//   next()
// })

app.use(express.json());
app.use(cookieParser());

app.use('/api/login', loginRoute );
app.use('/api', authMiddleware);
app.use('/api', roleRoute);
app.use('/api', superUserRouter );
app.use('/api', companyRouter);
app.use('/api', userRouter); 
app.use('/api', permissionRouter );
app.use('/api', changedLicenceRouter);

app.use('/api', urlsRouter );

app.use('/api', licencesTypeRouter);
app.use('/api', licenceFreeRouter);
app.use('/api', licencesSubscribeRouter);

app.use('/api', priceRouter );
app.use('/api', averagePriceRouter );

app.use('/api', motherBoardRouter);


export { app };