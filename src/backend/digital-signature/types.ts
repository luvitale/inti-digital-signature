import crypto from "crypto";
import { PathLike, promises as fsPromises } from "fs";

export type PrivateKey = string | crypto.KeyObject;
export type PublicKey = string | crypto.KeyObject;
export type Signature = string;
export type Path = PathLike | fsPromises.FileHandle;

export type CypherType = "rsa" | "dsa" | "ec";
export type ModulusLength = 1024 | 2048 | 4096;
export type Hash = "SHA1" | "SHA256";
export type KeyFormat = "pem";
