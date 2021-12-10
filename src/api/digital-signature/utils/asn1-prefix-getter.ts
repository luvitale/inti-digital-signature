import { Hash } from "./types";

abstract class ASN1PrefixGetter {
  protected next?: ASN1PrefixGetter;

  public abstract get(hash: Hash): Buffer | undefined;

  public setNextHandler(asn1PrefixGetter: ASN1PrefixGetter) {
    return (this.next = asn1PrefixGetter);
  }
}

class SHA1ASN1PrefixGetter extends ASN1PrefixGetter {
  public get(hash: Hash): Buffer | undefined {
    if (hash == "SHA1") {
      return Buffer.from([
        0x30, 0x21, 0x30, 0x09, 0x06, 0x05, 0x2b, 0x0e, 0x03, 0x02, 0x1a, 0x05,
        0x00, 0x04, 0x14,
      ]);
    }

    if (this.next) {
      return this.next.get(hash);
    }
  }
}

class SHA256ASN1PrefixGetter extends ASN1PrefixGetter {
  public get(hash: Hash): Buffer | undefined {
    if (hash == "SHA256") {
      return Buffer.from([
        0x30, 0x31, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03,
        0x04, 0x02, 0x01, 0x05, 0x00, 0x04, 0x20,
      ]);
    }

    if (this.next) {
      return this.next.get(hash);
    }
  }
}

class SHA384ASN1PrefixGetter extends ASN1PrefixGetter {
  public get(hash: Hash): Buffer | undefined {
    if (hash == "SHA384") {
      return Buffer.from([
        0x30, 0x41, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03,
        0x04, 0x02, 0x02, 0x05, 0x00, 0x04, 0x30,
      ]);
    }

    if (this.next) {
      return this.next.get(hash);
    }
  }
}

class SHA512ASN1PrefixGetter extends ASN1PrefixGetter {
  public get(hash: Hash): Buffer | undefined {
    if (hash == "SHA512") {
      return Buffer.from([
        0x30, 0x51, 0x30, 0x0d, 0x06, 0x09, 0x60, 0x86, 0x48, 0x01, 0x65, 0x03,
        0x04, 0x02, 0x03, 0x05, 0x00, 0x04, 0x40,
      ]);
    }

    if (this.next) {
      return this.next.get(hash);
    }
  }
}

const sha1ASN1PrefixGetter = new SHA1ASN1PrefixGetter();
const sha256ASN1PrefixGetter = new SHA256ASN1PrefixGetter();
const sha384ASN1PrefixGetter = new SHA384ASN1PrefixGetter();
const sha512ASN1PrefixGetter = new SHA512ASN1PrefixGetter();

sha1ASN1PrefixGetter.setNextHandler(sha256ASN1PrefixGetter);
sha256ASN1PrefixGetter.setNextHandler(sha384ASN1PrefixGetter);
sha384ASN1PrefixGetter.setNextHandler(sha512ASN1PrefixGetter);

const asn1PrefixGetter = sha1ASN1PrefixGetter;

export default asn1PrefixGetter;
