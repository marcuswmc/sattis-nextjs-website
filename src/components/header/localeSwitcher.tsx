import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const locales = [
  { code: "pt", name: "PT" },
  { code: "en", name: "EN" },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentlocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (newLocale: string) => {
    if(newLocale != locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <>
      <Select 
      onValueChange={handleLocaleChange}
      defaultValue={currentlocale.code}
      value={currentlocale.code}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder={`${currentlocale.name}`} />
        </SelectTrigger>
        <SelectContent>
          {locales.map(({ code, name }) => (
            <SelectItem key={code} value={`${code}`}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
