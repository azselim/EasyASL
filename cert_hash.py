#Create certificate w/ figma

#Generate certificate hash

import hashlib

def generate_cert_hash(cert_data):
 sha256 = hashlib.sha256()
 sha256.update(cert_data.encode('utf-8'))
 return sha256.hexdigest() 

cert_data = "NAME, ASL Proficiency Certification, XX/XX/2024, Issued by JEAK"
cert_hash = generate_cert_hash(cert_data)
print(cert_hash)

