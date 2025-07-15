"""
Job 10: Quét folder → Sinh báo cáo dung lượng theo định dạng file
Tools: Python os, collections
"""
import os
from collections import defaultdict

folder = 'data/'
report = defaultdict(lambda: {'count': 0, 'size': 0})
for root, dirs, files in os.walk(folder):
    for file in files:
        ext = file.split('.')[-1]
        path = os.path.join(root, file)
        size = os.path.getsize(path)
        report[ext]['count'] += 1
        report[ext]['size'] += size
for ext, info in report.items():
    print(f'{ext}: {info["count"]} files, {info["size"]} bytes')
