import { mydb } from "../../mymodules/prismaClientInstance";


export default async(req, res) => {
    const data = req.body;
    try{
        let result = "";
        
        result = await mydb.user.updateMany({
            where: {
                email: data.reviewerEmail
            },
            data: {
                preferredNumberOfPapers: data.preferredNumber
            }
        })
        
        result += await mydb.bids.create({
            data: {
                ...data,
            },
        });
        
        res.status(200).json(result);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}