import crypto from "crypto";
import { PathLike, promises as fsPromises } from "fs";

export type PrivateKey = crypto.KeyObject | string | Buffer;
export type PublicKey = crypto.KeyObject | string | Buffer;
export type Signature = string;
export type Path = PathLike | fsPromises.FileHandle;

export type CypherType = "rsa" | "dsa" | "ec";
export type ModulusLength = 1024 | 2048 | 4096;
export type Hash = "SHA1" | "SHA256" | "SHA384" | "SHA512";
export type KeyFormat = "pem";
