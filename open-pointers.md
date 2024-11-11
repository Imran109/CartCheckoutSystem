# <ins>OPEN POINTERS</ins>

## Product Pointers

### Basic Project Pointers:

1. For the 3-for-2 Apple TV deal:

   - Will there be an **incremental discount**? I.E, if someone buys 6 Apple TVs, do they have to pay for only 4, or 5 or no discount?
   - If someone buys 4 Apple TVs, do they get 1 or 2 free?
   - Should we show the original price and discount separately? <br><br>

2. What is the expected TAT to build and deploy once the new pricing and discount rule is set by the product team? <br><br>

3. What are the expected peak transaction volumes?<br><br>

4. How long will the oepning day special discounts last:

   - Do we automatically disable the discounts after 24H from the launch date?
   - Will there be a manual intervention to disable the launch day specials after some point?
   - If answer **"Yes"** above, then who all will have access to make this modification? Only Developers or Sales Managers or Sales Team Members?
   - Will there be a need for a portal with simple UI to manage these pricing rules by the business team
   - Should we plan for future product additions/removals? How frequently might these changes occur? <br><br>

5. What happens when a customer wants to get 3 Apple TVs but we have only 2 in our stock? How will the customer benefit from 3 for 2 deal? Same question goes for Ipad as well. <br><br>
6. What is the business deadline that we are looking at? <br><br>
7. Is it high, medium or low priority project? Basis the criticality and timeline restriction, the solution may vary <br><br>
8. Are SKUs guaranteed to be unique and case-sensitive? <br><br>
9. Can multiple discount rules apply to the same product?
   - If Yes, what's the priority order if multiple discounts could apply?<br><br>
10. Will this be an offline only store, or both online and offline?

### Checkout Process:

1. Do we need to support removing items after they've been scanned?
2. Should we provide any intermediate calculations or just the final total?
3. Should we support scanning multiple quantities of the same item at once, or only one at a time?
4. What kind of receipt/invoice should be generated after checkout?
5. Are there any specific performance requirements (e.g., maximum checkout time)?

### Pricing Rules:

1. What other types of discounts might be added in the future? For example:

   - Percentage discounts
   - Bundle discounts (buy product A, get product B at a discount)
   - Time-based discounts
   - Customer tier-based discounts

2. Can pricing rules be changed mid-transaction?
3. Should we support temporary/promotional pricing rules with start/end dates?
4. How should we handle rounding for calculations involving discounts?

### Future Considerations:

1. Is there a plan to integrate this with other systems (inventory, POS, etc.)?
2. Should we design for multi-currency support?
3. Will this need to scale to multiple stores/locations?
4. Are there plans to add user authentication or role-based pricing?

## Tech Pointers

### Data Store:

1. Is the product data (SKU, Name, Price) stored somewhere, or should we hardcode it initially? <br>
2. Where do we store the product and it's price? <br>
3. Where do we maintain the pricing and discount rules? <br>

### Architecture & Infrastructure:

1. What's the expected load/traffic?
2. Do we need real-time updates?
3. Backup and disaster recovery requirements
4. System availability requirements

### Security & Compliance:

1. Are there any specific security requirements?
2. Do we need to implement audit logging?
3. Access control requirements?

### Integration Requirements:

1. What systems will this need to integrate with?
2. Required APIs and interfaces
3. Data synchronization requirements

### Development & Deployment

1. What is the preferred development methodology?
2. CI/CD requirements
3. Testing requirements (unit)
4. Monitoring and alerting requirements

### Performance Requirements

1. Response time expectations
2. Concurrent user handling
3. Data retention policies
4. Scalability requirements
