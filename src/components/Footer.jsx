import { appName } from '../config/env.js';

export default function Footer() {
  return <footer className="site-footer"><span>{appName}</span><a href="#home">Back to top ↑</a></footer>;
}
