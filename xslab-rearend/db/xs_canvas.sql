CREATE TABLE IF NOT EXISTS XS_CANVAS (
ID INTEGER PRIMARY KEY NOT NULL ,
NAME  NVARCHAR(100) NOT NULL,
DATA BLOB NOT NULL,
OPTIONS NVARCHAR(2000) NOT NULL,
CREATETIME TIMESTAMP NOT NULL,
`DELETE` INTEGER NOT NULL DEFAULT 1,
STATE INTEGER NOT NULL DEFAULT 1
)