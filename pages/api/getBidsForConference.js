import { mydb } from "../../mymodules/prismaClientInstance";

export default async(req, res) => {
    let data = req.query;
    try {
        const papers = await mydb.paper.findMany({
            where: {reviewer: null},
            select: {
                id: true,
                title: true,
                description: true,
                authorEmail: true,
                Bids: {
                    select: {
                        paperID: true,
                        reviewerEmail: true
                    }
                }
            }
        });

        for(let i = 0; i < papers.length; i++) {
            for(let x = 0; x < papers[i].Bids.length; x++) {
                const preferredNumbers = await mydb.user.findMany({
                    where: {email: papers[i].Bids[x].reviewerEmail}, 
                    select: {preferredNumberOfPapers: true}}
                );
                console.log(preferredNumbers)
                papers[i].Bids[x].preferredNumbers = preferredNumbers[0].preferredNumberOfPapers;
            }
        }

        res.status(200).json(papers);
    }catch (error){   
        res.status(503).json({error: error.toString()});
    }
    
    
}