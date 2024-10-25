import {
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  IdentificationIcon,
  CalendarIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import type { BusinessCase } from "@/types/business.ts";

interface BusinessCaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  businessCase: BusinessCase | null;
}

const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value || "-"}</span>
  </div>
);

const ContactItem = ({ icon: Icon, value }: { icon: React.ElementType; value: React.ReactNode }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span>{value}</span>
    </div>
  );
};

const BusinessCaseDialog = ({ isOpen, onClose, businessCase }: BusinessCaseDialogProps) => {
  if (!businessCase) return null;

  const addressInfo = businessCase.primaryAddress;
  const contactInfo = addressInfo?.contactInfo;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-2xl font-semibold">
            <span>{businessCase.name}</span>
            <div className="flex gap-2 pr-4">
              <Badge variant={businessCase.state === "B_ACTUAL" ? "success" : "secondary"}>
                {businessCase.state === "A_POTENTIAL" ? "Potenciální" : "Aktivní"}
              </Badge>
              <Badge variant="outline">{businessCase.rating}</Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <BuildingOfficeIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Základní informace</h3>
              </div>
              <Card>
                <CardContent className="space-y-2 pt-6">
                  <InfoItem
                    label="IČO"
                    value={businessCase.regNumber}
                  />
                  <InfoItem
                    label="DIČ"
                    value={businessCase.taxNumber}
                  />
                  <InfoItem
                    label="Datová schránka"
                    value={businessCase.databox}
                  />
                  {businessCase.court && (
                    <InfoItem
                      label="Soud"
                      value={businessCase.court}
                    />
                  )}
                  <InfoItem
                    label="Role"
                    value={
                      <Badge variant="outline">
                        {businessCase.role === "C_SUPPLIER"
                          ? "Dodavatel"
                          : businessCase.role === "E_OWN"
                            ? "Vlastní"
                            : businessCase.role === "A_SUBSCRIBER"
                              ? "Odběratel"
                              : businessCase.role}
                      </Badge>
                    }
                  />
                </CardContent>
              </Card>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Adresa</h3>
              </div>
              <Card>
                <CardContent className="space-y-2 pt-6">
                  <InfoItem
                    label="Ulice"
                    value={addressInfo?.address?.street}
                  />
                  <InfoItem
                    label="Město"
                    value={addressInfo?.address?.city}
                  />
                  <InfoItem
                    label="PSČ"
                    value={addressInfo?.address?.zipCode}
                  />
                  <InfoItem
                    label="Země"
                    value={addressInfo?.address?.country}
                  />
                </CardContent>
              </Card>
            </section>

            {(contactInfo?.email || contactInfo?.tel1 || contactInfo?.www) && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Kontaktní údaje</h3>
                </div>
                <Card>
                  <CardContent className="space-y-3 pt-6">
                    <ContactItem
                      icon={EnvelopeIcon}
                      value={contactInfo?.email}
                    />
                    <ContactItem
                      icon={PhoneIcon}
                      value={contactInfo?.tel1}
                    />
                    <ContactItem
                      icon={GlobeAltIcon}
                      value={contactInfo?.www}
                    />
                  </CardContent>
                </Card>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <IdentificationIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Vlastník</h3>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {businessCase.owner?.fullName
                          ?.split(" ")
                          .map(n => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{businessCase.owner?.fullName}</div>
                      <div className="text-sm text-muted-foreground">Vlastník</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {businessCase.paymentTerm && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <BanknotesIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Platební podmínky</h3>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <InfoItem
                      label="Splatnost"
                      value={businessCase.paymentTerm.value}
                    />
                  </CardContent>
                </Card>
              </section>
            )}

            {businessCase.birthday && (
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Další informace</h3>
                </div>
                <Card>
                  <CardContent className="pt-6">
                    <InfoItem
                      label="Datum založení"
                      value={new Date(businessCase.birthday).toLocaleDateString("cs-CZ")}
                    />
                  </CardContent>
                </Card>
              </section>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={onClose}
          >
            Zavřít
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessCaseDialog;
