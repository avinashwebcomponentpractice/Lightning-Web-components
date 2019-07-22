public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name FROM Account ];
    }
    @AuraEnabled(cacheable=true)
    public static map<id,List<Contact>> getAccountContactList() {
        map<Id,List<Contact>> accountContactMap = new map<id,List<Contact>>();
        
        List<Account> lstAccount = [SELECT Id, name, (SELECT Id, Name FROM Contacts) FROM Account];
        
        for(Account acc : lstAccount)
        {
            accountContactMap.put(acc.id, acc.Contacts);
        }
        
        return accountContactMap;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> findContacts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT Id, Name, Title, Phone, Email FROM Contact WHERE Name LIKE :key  LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static Contact getSingleContact(){
        return [SELECT Id, Name, Title, Phone, Email FROM Contact LIMIT 1];
    }

}