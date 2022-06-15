import { FormControl } from '@angular/forms';
import * as RegEx from '../../shared/regex';
export function SocialLinkValidator(
  control: FormControl
): { [s: string]: boolean } | null {
  if (!control.value) return null;
  const value: string = control.value;
  console.log(
    RegEx.facebook.test(value),
    RegEx.twitter.test(value),
    RegEx.linkedin.test(value)
  );
  if (RegEx.facebook.test(value)) {
    console.log('fb');
    return null;
  } else if (RegEx.twitter.test(value)) {
    console.log('tw');
    return null;
  } else if (RegEx.linkedin.test(value)) {
    console.log('ln');
    return null;
  }

  return { socialLinksValid: true };
}
