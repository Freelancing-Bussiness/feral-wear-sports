# FERAL Wear: GitHub se Vercel deployment

## 1. GitHub repository banayein

1. GitHub login karke **New repository** press karein.
2. Repository name `feral-wear-sports` rakhein.
3. **Private** select karein.
4. README, .gitignore ya license GitHub se add na karein.
5. **Create repository** press karein.

## 2. Local project GitHub par push karein

Project folder mein terminal khol kar GitHub ke displayed commands use karein:

```powershell
git add .
git commit -m "Prepare FERAL Wear for Vercel"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/feral-wear-sports.git
git push -u origin main
```

`YOUR-USERNAME` ko apne GitHub username se replace karein. Password chat ya repository mein save na karein; browser/Git Credential Manager se sign in karein.

## 3. GitHub repository Vercel mein import karein

1. Vercel Dashboard mein **Add New → Project** press karein.
2. GitHub connect/authorize karein.
3. `feral-wear-sports` repository ke saamne **Import** press karein.
4. Framework Preset: **Next.js**.
5. Root Directory: `./`.
6. Build Command: `npm run build` (default rehne dein).
7. Output Directory override na karein.
8. Environment variables abhi required nahi.
9. **Deploy** press karein.

## 4. Domain connect karein

1. Vercel Project → **Settings → Domains**.
2. `feralwearsports.com` add karein.
3. `www.feralwearsports.com` add karein.
4. `www.feralwearsports.com` ko primary rakhein.
5. Root domain ko `www` par redirect karein.
6. Namecheap mein jo Vercel A/CNAME records add kiye hain unhein rehne dein.
7. Vercel par **Refresh/Verify** karein; SSL automatically issue hoga.

## 5. Future updates

Har change ke baad:

```powershell
git add .
git commit -m "Describe the update"
git push
```

Vercel `main` branch ke har push ko automatically production par deploy karega.
