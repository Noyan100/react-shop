import React from 'react';
import SideBar from './components/CollectionSidebar/SideBar';
import s from './CollectionPage.module.scss';
import CollectionMenu from './components/CollectionMenu/CollectionMenu';
import Collection from './components/Collection/Collection';
import Path from '../../components/Path/Path';
import { fetchItems } from '../../redux/thunks/fetchItems';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

type TCollectionPage = {};

const CollectionPage: React.FC<TCollectionPage> = ({}) => {
  React.useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const obj = [
    {
      id: '0',
      name: 'Sofa',
      cost: 1755,
      sale: 30,
      rating: 5,
      category: 'Sofas',
      featured: 'Spring',
      items: [
        {
          color: '#25282A',
          photos: [
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
          ],
        },
        {
          color: '#016262',
          photos: [
            'https://placehold.co/600x400/016262/white',
            'https://placehold.co/600x400/016262/white',
            'https://placehold.co/600x400/016262/white',
            'https://placehold.co/600x400/016262/white',
            'https://placehold.co/600x400/016262/white',
            'https://placehold.co/600x400/016262/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '4',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
      ],
    },
    {
      id: '1',
      name: 'Sectionals',
      cost: 1055,
      sale: 30,
      rating: 6,
      category: 'Sectional',
      featured: 'Sale',
      items: [
        {
          color: '#252',
          photos: [
            'https://placehold.co/600x400/252/white',
            'https://placehold.co/600x400/252/white',
            'https://placehold.co/600x400/252/white',
            'https://placehold.co/600x400/252/white',
            'https://placehold.co/600x400/252/white',
            'https://placehold.co/600x400/252/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
      ],
    },
    {
      id: '2',
      name: 'Wooden chair',
      cost: 355,
      sale: 30,
      rating: 4,
      category: 'Chairs',
      featured: 'Spring',
      items: [
        {
          color: '#25282A',
          photos: [
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '4',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
        {
          name: '5',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
        {
          name: '6',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
      ],
    },
    {
      id: '3',
      name: 'Sleepers',
      cost: 355,
      sale: 5,
      rating: 8,
      category: 'Sleepers',
      featured: 'Spring',
      items: [
        {
          color: '#ffa500',
          photos: [
            'https://placehold.co/600x400/ffa500/white',
            'https://placehold.co/600x400/ffa500/white',
            'https://placehold.co/600x400/ffa500/white',
          ],
        },
        {
          color: '#ffd700',
          photos: [
            'https://placehold.co/400x200/ffd700/white',
            'https://placehold.co/400x200/ffd700/white',
            'https://placehold.co/400x200/ffd700/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
      ],
    },
    {
      id: '4',
      name: 'Coffe table',
      cost: 755,
      sale: 10,
      rating: 4,
      category: 'Coffee tables',
      featured: 'New Arrival',
      items: [
        {
          color: '#25282A',
          photos: [
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
      ],
    },
    {
      id: '5',
      name: 'Bed',
      cost: 7555,
      sale: 30,
      rating: 9,
      category: 'Beds',
      featured: 'Clearance',
      items: [
        {
          color: '#25282A',
          photos: [
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '4',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
        {
          name: '5',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
        {
          name: '6',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
      ],
    },
    {
      id: '6',
      name: 'Beautiful chair',
      cost: 655,
      sale: 70,
      rating: 4,
      category: 'Chairs',
      featured: 'Sale',
      items: [
        {
          color: '#25282A',
          photos: [
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 3,
        },
        {
          name: '4',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
        {
          name: '6',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 4,
        },
      ],
    },
    {
      id: '7',
      name: 'Not bad bed',
      cost: 555,
      sale: 55,
      rating: 73,
      category: 'Beds',
      featured: 'Sale',
      items: [
        {
          color: '#f3da0b',
          photos: [
            'https://placehold.co/600x400/f3da0b/white',
            'https://placehold.co/600x400/f3da0b/white',
            'https://placehold.co/600x400/f3da0b/white',
            'https://placehold.co/600x400/f3da0b/white',
          ],
        },
        {
          color: '#25282A',
          photos: [
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
            'https://placehold.co/600x400/25282A/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
      ],
    },
    {
      id: '8',
      name: 'Wooden sofa',
      cost: 255,
      sale: 15,
      rating: 10,
      category: 'Sofas',
      featured: 'Spring',
      items: [
        {
          color: '#ffff00',
          photos: [
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
          ],
        },
        {
          color: '#00ff00',
          photos: [
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
          ],
        },
        {
          color: '#bef574',
          photos: [
            'https://placehold.co/600x400/bef574/white',
            'https://placehold.co/600x400/bef574/white',
            'https://placehold.co/600x400/bef574/white',
            'https://placehold.co/600x400/bef574/white',
            'https://placehold.co/600x400/bef574/white',
            'https://placehold.co/600x400/bef574/white',
          ],
        },
        {
          color: '#ffdb58',
          photos: [
            'https://placehold.co/600x400/ffdb58/white',
            'https://placehold.co/600x400/ffdb58/white',
            'https://placehold.co/600x400/ffdb58/white',
            'https://placehold.co/600x400/ffdb58/white',
            'https://placehold.co/600x400/ffdb58/white',
            'https://placehold.co/600x400/ffdb58/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 5,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
        {
          name: '4',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
        {
          name: '5',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
        {
          name: '6',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
        {
          name: '7',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
        {
          name: '8',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 5,
        },
      ],
    },
    {
      id: '9',
      name: 'Creating couch',
      cost: 1255,
      sale: 5,
      rating: 1,
      category: 'Sectional',
      featured: 'Clearance',
      items: [
        {
          color: '#ffff00',
          photos: [
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
            'https://placehold.co/600x400/ffff00/white',
          ],
        },
        {
          color: '#00ff00',
          photos: [
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
            'https://placehold.co/600x400/00ff00/white',
          ],
        },
      ],
      reviews: [
        {
          name: 'Darrell Steward',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412412,
          stars: 1,
        },
        {
          name: 'Darrell',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 1,
        },
        {
          name: '3',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 1,
        },
        {
          name: '4',
          title: 'I Like This Product!',
          text: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod me placeat facere possimus, omnis voluptas assumenda.',
          date: 12412414,
          stars: 1,
        },
      ],
    },
  ];

  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.items.items);
  const { category, currentPage, featured, minPrice, maxPrice, sort } = useAppSelector(
    (state) => state.filter,
  );
  React.useEffect(() => {
    dispatch(fetchItems({ category, currentPage, featured, minPrice, maxPrice, sort }));
  }, [category, currentPage, featured, minPrice, maxPrice, sort]);

  return (
    <div className={s.container}>
      <div className={s.path}>
        <Path />
      </div>
      <div className={s.title}>Collection</div>
      <div className={s.menu}>
        <CollectionMenu />
      </div>
      <div className={s.sidebar}>
        <SideBar />
      </div>
      <div className={s.collection}>
        <Collection items={items} />
      </div>
    </div>
  );
};

export default CollectionPage;
