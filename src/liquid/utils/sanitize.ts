import { sanitize as purify } from "dompurify";

const sanitizeConfigCustomElements = {
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: /^ld-/,
  },
};

export const sanitize = (
  htmlString: string,
  sanitizeConfig: SanitizeConfig | string,
) => {
  return purify(htmlString, {
    ...sanitizeConfigCustomElements,
    ...(typeof sanitizeConfig === "string"
      ? JSON.parse(sanitizeConfig)
      : sanitizeConfig || {}),
  } as SanitizeConfig);
};
