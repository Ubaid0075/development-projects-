from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

print("Chatbot is ready! Type 'exit' to stop.\n")

chat_history_ids = None

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Bot: Bye 👋")
        break

    new_input_ids = tokenizer(
    user_input + tokenizer.eos_token,
    return_tensors="pt"
     )
 
    input_ids = new_input_ids["input_ids"]
    attention_mask = new_input_ids["attention_mask"]


    bot_input_ids = (
    torch.cat([chat_history_ids, input_ids], dim=-1)
    if chat_history_ids is not None
    else input_ids
)


    chat_history_ids = model.generate(
    bot_input_ids,
    max_length=1000,
    do_sample=True,
    temperature=0.7,
    top_k=50,
    top_p=0.95,
    no_repeat_ngram_size=3,
    pad_token_id=tokenizer.eos_token_id
)


    bot_response = tokenizer.decode(
        chat_history_ids[:, bot_input_ids.shape[-1]:][0],
        skip_special_tokens=True
    )

    print("Bot:", bot_response)
