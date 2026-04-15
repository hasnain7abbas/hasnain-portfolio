import { Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  RedditIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "./icons";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary text-center md:text-left">
          Built by{" "}
          <span className="text-text-primary font-medium">
            {siteConfig.name}
          </span>{" "}
          &copy; {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap gap-4 justify-center text-text-secondary">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors p-1"
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors p-1"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors p-1"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={siteConfig.reddit}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors p-1"
            aria-label="Reddit"
          >
            <RedditIcon size={18} />
          </a>
          <a
            href={siteConfig.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors p-1"
            aria-label="Facebook"
          >
            <FacebookIcon size={18} />
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors p-1"
            aria-label="WhatsApp"
          >
            <WhatsappIcon size={18} />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-accent transition-colors p-1"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
