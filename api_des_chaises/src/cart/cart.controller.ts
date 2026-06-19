import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CartService } from './cart.service';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { UpdateCartItemDto } from "../dto/update-cart-item.dto";

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getOrCreateCart(req.user.id);
  }

  @Post('items')
  addItem(@Req() req, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(req.user.id, dto.chaiseId, dto.quantity);
  }

  @Patch('items/:id')
  updateItem(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCartItemDto) {
    return this.cartService.updateItemQuantity(req.user.id, id, dto.quantity);
  }

  @Delete('items/:id')
  removeItem(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeItem(req.user.id, id);
  }
}