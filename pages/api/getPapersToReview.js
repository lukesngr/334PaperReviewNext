import { mydb } from "../../mymodules/prismaClientInstance";

export default async(req, res) => {
    let data = req.query;
    try {
        const papers = await mydb.paper.findMany({
            where: {NOT: [{reviewer: null}]},
            select: {
                id: true,
                authorEmail: true,
                title: true,
                description: true,
                Review: {
                    select: {
                        reviewText: true,
                        rating: true
                    }
                }
            }
        });

        res.status(200).json(papers);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}