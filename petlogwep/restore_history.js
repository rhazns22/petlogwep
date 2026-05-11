const fs = require('fs');
const path = require('path');

const historyDir = "C:\\Users\\Administrator\\AppData\\Roaming\\Code\\User\\History";
const targetDir = "c:\\Users\\Administrator\\Desktop\\petlog";

const filesToRestore = [
    "src/App.tsx",
    "src/index.css",
    "src/main.tsx",
    "src/pages/ManualInput.tsx",
    "src/pages/Home.tsx",
    "src/pages/Transactions.tsx",
    "src/contexts/AuthContext.tsx",
    "src/lib/gemini.ts",
    "src/lib/utils.ts"
];

function restoreLatest() {
    try {
        const dirs = fs.readdirSync(historyDir);
        for (const dir of dirs) {
            const currentDir = path.join(historyDir, dir);
            const entriesPath = path.join(currentDir, "entries.json");
            if (fs.existsSync(entriesPath)) {
                try {
                    const data = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
                    if (!data.resource) continue;
                    
                    let resPath = data.resource.replace("file:///", "").replace(/%3A/g, ":").replace(/\//g, "\\");
                    
                    for (const relPath of filesToRestore) {
                        const absTarget = path.join(targetDir, relPath).replace(/\//g, "\\");
                        if (resPath.toLowerCase() === absTarget.toLowerCase()) {
                            const entries = data.entries || [];
                            if (entries.length === 0) continue;
                            
                            entries.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                            const latestEntry = entries[0];
                            const entryFile = path.join(currentDir, latestEntry.id);
                            
                            if (fs.existsSync(entryFile)) {
                                console.log(`Restoring ${relPath} from ${entryFile} (Timestamp: ${latestEntry.timestamp})`);
                                fs.copyFileSync(entryFile, absTarget);
                            }
                        }
                    }
                } catch (e) {
                    // skip errors parsing JSON
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}

restoreLatest();
