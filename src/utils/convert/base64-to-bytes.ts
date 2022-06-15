export class Base64ToBytes {
  private static keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  public static decode(input: string) {
    //get last chars to see if are valid
    input = this.removePaddingChars(input);
    input = this.removePaddingChars(input);

    const bytes = Number.parseInt(((input.length / 4) * 3).toString(), 10);

    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i, j = 0;

    const uarray = new Uint8Array(bytes);

    input = input.replace(/[^\d+/=A-Za-z]/g, "");

    for (i = 0; i < bytes; i += 3) {
      //get the 3 octects in 4 ascii chars
      enc1 = this.keyStr.indexOf(input.charAt(j++));
      enc2 = this.keyStr.indexOf(input.charAt(j++));
      enc3 = this.keyStr.indexOf(input.charAt(j++));
      enc4 = this.keyStr.indexOf(input.charAt(j++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      uarray[i] = chr1;
      if (enc3 != 64) uarray[i + 1] = chr2;
      if (enc4 != 64) uarray[i + 2] = chr3;
    }

    return uarray;
  }

  private static removePaddingChars(input: string) {
    const lkey = this.keyStr.indexOf(input.charAt(input.length - 1));

    if (lkey === 64) {
      return input.slice(0, Math.max(0, input.length - 1));
    }

    return input;
  }
}
