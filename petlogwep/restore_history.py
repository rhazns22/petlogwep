import os
import json
import shutil
import glob
from datetime import datetime

history_dir = r"C:\Users\Administrator\AppData\Roaming\Code\User\History"
target_dir = r"c:\Users\Administrator\Desktop\petlog"

# Define the files we want to restore
files_to_restore = [
    "src/App.tsx",
    "src/index.css",
    "src/main.tsx",
    "src/pages/ManualInput.tsx",
    "src/pages/Home.tsx",
    "src/pages/Transactions.tsx",
    "src/contexts/AuthContext.tsx",
    "src/lib/gemini.ts",
    "src/lib/utils.ts"
]

def restore_latest():
    for root, dirs, files in os.walk(history_dir):
        if "entries.json" in files:
            entries_path = os.path.join(root, "entries.json")
            try:
                with open(entries_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    resource = data.get("version", 1) # entries.json schema
                    # entries.json structure: {"version": 1, "resource": "file:///c%3A/Users/...", "entries": [{"id": "...", "timestamp": ...}]}
                    
                    if "resource" not in data: continue
                    res_path = data["resource"].replace("file:///", "").replace("%3A", ":").replace("/", "\\")
                    
                    # Check if this resource is one of the files we want to restore
                    for rel_path in files_to_restore:
                        abs_target = os.path.join(target_dir, rel_path).replace("/", "\\")
                        if res_path.lower() == abs_target.lower():
                            entries = data.get("entries", [])
                            if not entries: continue
                            
                            # Sort entries by timestamp descending
                            entries.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
                            
                            # Find the latest entry BEFORE the checkout time (Checkout time is roughly 1778465397000 ms)
                            # Actually, any entry from the last few hours is fine. Let's just grab the latest one.
                            latest_entry = entries[0]
                            entry_file = os.path.join(root, latest_entry["id"])
                            
                            if os.path.exists(entry_file):
                                print(f"Restoring {rel_path} from {entry_file} (Timestamp: {latest_entry['timestamp']})")
                                shutil.copy2(entry_file, abs_target)
            except Exception as e:
                pass

if __name__ == "__main__":
    restore_latest()
