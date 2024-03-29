import { type ReactNode } from "react";
import { type EnrichedTweet } from "react-tweet";

const Link: React.FC<{ href: string; children: ReactNode }> = ({
  href,
  children,
}) => (
  <a
    className="text-[rgb(29,161,242)] font-normal no-underline"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

export const TweetText: React.FC<{ tweet: EnrichedTweet }> = ({ tweet }) => (
  <div
    className={`mb-2 mt-4 truncate whitespace-pre-wrap text-xs text-gray-700 dark:text-gray-200`}
  >
    {tweet?.entities?.map((item, i) => {
      switch (item.type) {
        case "hashtag":
        case "mention":
        case "url":
        case "symbol":
          return (
            <Link key={i} href={`${item.href}`}>
              {item.text}
            </Link>
          );
        case "media":
          return;
        default:
          // We use `dangerouslySetInnerHTML` to preserve the text encoding.
          // https://github.com/vercel-labs/react-tweet/issues/29
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: item.text }} />
          );
      }
    })}
  </div>
);
