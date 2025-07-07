'use client'

import { Card, SearchBar, Categories } from '@/components';
import MainLayout from '../../components/mainLayout';
import ad1 from '@/assets/ads/ad1.png';
import { filterOptions } from '../../constants';
import DealsPage from '@/components/dealList';
import { useState } from 'react';

export default function HomePage() {
          const categoryOptions = [
  "Electronics", 
  "Food & Beverages", 
  "Graphic Design", 
  "Groceries",
  "Clothing & Apparel",
  "Home & Kitchen",
  "Sports",
  "Travel",
];

const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (

    <MainLayout>
      <div className="p-8">
        <SearchBar
          filters={filterOptions}
          onSearch={(query) => {console.log('Search query:', query);}}
          onFiltersChange={(filters) => console.log('Filters:', filters)}
          placeholder="Search for products"
        />
        <br></br>
        <Card
          cardBackground="bg-gradient-to-r from-purple-500 to-pink-500"
          cardPic={ad1}
          altText={{
            discount: "30% OFF",
            title: "Dyson $500 Gift Card",
            description: "Get 30% with our exclusive Dyson gift card offer! Enjoy a $500 gift card to use on your next purchase. Limited time only!",
          }}
        />
        <br></br>
        <Categories
          categories={categoryOptions}
          activeCategory={activeCategory ?? undefined}
          onCategorySelect={(category) => setActiveCategory(category)}
        />

          <DealsPage selectedCategory={activeCategory}></DealsPage>
      </div>
    </MainLayout>
  );
}