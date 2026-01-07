import { Phone, Mail, MessageCircle } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-green-600 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-end gap-6 items-center">

        <div className="flex items-center gap-1">
          <Phone size={14} />
          <span>+91 98220 29999</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          <Mail size={14} />
          <span>Send Email</span>
        </div>

        <div className="flex items-center gap-1 cursor-pointer hover:underline">
          <MessageCircle size={14} />
          <span>Send SMS</span>
        </div>

      </div>
    </div>
  );
}
