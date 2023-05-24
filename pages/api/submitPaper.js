import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async(req, res) => {
    const data = req.body;
    try
        {   
            let result = "";
            result = await prisma.paper.create({
                data: {
                    ...data,
                },
            });
            
            res.status(200).json(result);
        }
        catch (err)
        {   
            res.status(503).json({err: err.toString()});
        }
    
    
}