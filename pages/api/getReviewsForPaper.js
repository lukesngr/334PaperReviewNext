import { mydb } from "../../mymodules/prismaClientInstance";

export default async(req, res) => {
    let data = req.query;
    try {
        const reviews = await mydb.review.findMany({
            where: {paperID: parseInt(data.paperID)},
            select: {
                id: true,
                reviewText: true,
                rating: true,
                Comment: {
                    select:{
                        comment: true
                    }
                }
            }
        });

        res.status(200).json(reviews);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}