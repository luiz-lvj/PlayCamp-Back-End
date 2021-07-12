import pg from 'pg';

const { Pool } = pg;


const connection = new Pool({
	host: "ec2-54-227-246-76.compute-1.amazonaws.com",
	user: "elpbxjazicbpma",
	password: "84e60c120bcdabf2de963d06e00a19f1de9f05260af1680092d86e77006643dc",
	port: 5432,
	database: "dd2peo984vm03d"
});

export default connection;