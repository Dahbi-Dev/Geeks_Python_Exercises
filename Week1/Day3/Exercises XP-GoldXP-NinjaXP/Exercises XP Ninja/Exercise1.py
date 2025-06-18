class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []
    
    def call(self, other_phone):
        call_record = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_record)
        self.call_history.append(call_record)
        other_phone.call_history.append(f"Received call from {self.phone_number}")
    
    def show_call_history(self):
        print(f"Call history for {self.phone_number}:")
        for call in self.call_history:
            print(f"- {call}")
    
    def send_message(self, other_phone, content):
        message = {"to": other_phone.phone_number, "from": self.phone_number, "content": content}
        self.messages.append(message)
        other_phone.messages.append(message)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}")
    
    def show_outgoing_messages(self):
        print(f"Outgoing messages from {self.phone_number}:")
        for msg in self.messages:
            if msg["from"] == self.phone_number:
                print(f"- To {msg['to']}: {msg['content']}")
    
    def show_incoming_messages(self):
        print(f"Incoming messages to {self.phone_number}:")
        for msg in self.messages:
            if msg["to"] == self.phone_number:
                print(f"- From {msg['from']}: {msg['content']}")
    
    def show_messages_from(self, phone_number):
        print(f"Messages from {phone_number} to {self.phone_number}:")
        for msg in self.messages:
            if msg["from"] == phone_number and msg["to"] == self.phone_number:
                print(f"- {msg['content']}")

# Testing the Phone class
print("=== Phone Class Test ===")

# Create phone objects
phone1 = Phone("123-456-7890")
phone2 = Phone("987-654-3210")
phone3 = Phone("555-123-4567")

print("\n=== Making Calls ===")
phone1.call(phone2)
phone2.call(phone3)
phone1.call(phone3)

print("\n=== Call History ===")
phone1.show_call_history()
print()
phone2.show_call_history()

print("\n=== Sending Messages ===")
phone1.send_message(phone2, "Hello!")
phone2.send_message(phone1, "Hi there!")
phone1.send_message(phone3, "How are you?")
phone3.send_message(phone1, "I'm good, thanks!")

print("\n=== Message History ===")
phone1.show_outgoing_messages()
print()
phone1.show_incoming_messages()
print()
phone1.show_messages_from("987-654-3210")