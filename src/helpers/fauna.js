// Module imports
import fauna from 'faunadb'





export const client = new fauna.Client({
	domain: 'db.fauna.com',
	port: 443,
	scheme: 'https',
	secret: process.env.FAUNA_SECRET,
})

export const q = fauna.query
