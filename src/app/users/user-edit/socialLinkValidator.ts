import { AbstractControl, ValidationErrors, FormArray } from '@angular/forms';

export function SocialLinkValidator(
  control: AbstractControl
): ValidationErrors | null {
  const socialLinks = control.get('socialLinks');
  console.log(!socialLinks, socialLinks, control);

  if (!socialLinks) return null;

  const socialLinksControls = (<FormArray>socialLinks).controls;

  socialLinksControls.forEach((control) => {
    const social = control.get('social');
    const address = control.get('address');
    console.log('social-address: ', social, address);
    if (address.value === null) return null;
    switch (social.value) {
      case 'facebook':
        return address.value.match(
          /^(http(s)?:\/\/)?((w{3}\.)?)facebook.com(\/.+)?$/
        )
          ? { socialLinksValid: true }
          : null;

      case 'twitter':
        return address.value.match(
          /^(http(s)?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/
        )
          ? { socialLinksValid: true }
          : null;
      case 'linkedin':
        return address.value.match(
          /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)(\/\w+)?$/
        )
          ? { socialLinksValid: true }
          : null;
    }
  });
}
